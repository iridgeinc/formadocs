#!/usr/bin/env node

const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs/promises');
const fsex = require('fs-extra')
const path = require('path');
const util = require('util');

const overview_text = `---
title: Overview
sidebar_label: Overview
---
`;

const doc_text = ({ endpoint, method}) => {
  return `---
title: ${method.toUpperCase()}
sidebar_label: ${method.toUpperCase()}
---
import {FormadocsTag, FormadocsMethod, FormadocsEndpoint, FormadocsParameters, FormadocsRequestBody, FormadocsResponses} from '/src/formadocs';

<FormadocsTag endpoint={'${endpoint}'} method={'${method}'} />

## URL
<FormadocsEndpoint endpoint={'${endpoint}'} method={'${method}'} />

<FormadocsMethod endpoint={'${endpoint}'} method={'${method}'} />

## Parameters
<FormadocsParameters endpoint={'${endpoint}'} method={'${method}'} />

## Request Body
<FormadocsRequestBody endpoint={'${endpoint}'} method={'${method}'} />

## Responses
<FormadocsResponses endpoint={'${endpoint}'} method={'${method}'} />
`
}


async function main () {
  const argv = require('yargs/yargs')(process.argv.slice(2))
    .option(
      'openapi',
        {
        alias: 'o',
        describe: 'a path of openapi file'
      }
    )
    .option('path', {
      alias: 'p',
      describe: 'a path to output a documentation'
    })
    .alias('u', 'update').boolean('u').describe('u', 'Update only')
    .demandOption(['openapi', 'path'], 'Please provide both openapi and path arguments to build documentation with openapi')
    .help()
    .argv;
  console.log('argv', argv);

  let api = await SwaggerParser.dereference(argv.openapi);
  console.log('api', api);

  if (argv.update) {
    await fs.writeFile(path.join(argv.path, 'src/formadocs/openapi.json'), JSON.stringify(api, null, 2));
    return;
  }

  await fs.mkdir(argv.path);
  await fsex.copy('./resources/default', argv.path);
  await fs.writeFile(path.join(argv.path, 'src/formadocs/openapi.json'), JSON.stringify(api, null, 2));

  const sidebars = {
    docs: [
      'reference/overview',
    ]
  };
  const paths = Object.entries(api.paths);
  for (let i = 0; i < paths.length; i++) {
      const [endpoint, methods] = paths[i];
      const target_dir = path.join(argv.path, 'docs/reference', endpoint);
      await fs.mkdir(target_dir, {recursive: true});

      let fp = await fs.open(path.join(target_dir, 'overview.md'), 'w');
      await fp.write(overview_text);
      await fp.close();

      const items = [path.join('reference', endpoint, 'overview')];

      const ms = Object.keys(methods);
      for (let j = 0; j < ms.length; j++) {
        const method = ms[j];
        let fp = await fs.open(path.join(target_dir, `${method}.mdx`), 'w');
        await fp.write(doc_text({endpoint, method}));
        await fp.close();
        items.push(path.join('reference', endpoint, method))
      }
      sidebars.docs.push({
        type: 'category',
        label: endpoint,
        items
      })
  }

  let fp = await fs.open(path.join(argv.path, 'sidebars.js'), 'w');
  await fp.write(`module.exports = ${util.inspect(sidebars, {depth: 3})}`);
  await fp.close();
}


main();
