import React from 'react';
import OpenAPI from './openapi.json';

import SwaggerParser from "@apidevtools/swagger-parser";
import { useAsync } from "react-async"
import clsx from 'clsx';

const parser = async ({api}) => {
  return await SwaggerParser.parse(api)
}

export function FormadocsTag ({endpoint, method}) {
  const {data} = useAsync({ promiseFn: parser, api: OpenAPI});
  if (data) {
    const resource = data.paths[endpoint][method];
    if (resource.tags) {
      return (
        <div>
          {resource.tags.map((tag, idx) => (
            <span className="badge badge--secondary" key={idx}>{tag}</span>
          ))}
        </div>
      );
    }
  }
  return null;
}

export function FormadocsMethod ({endpoint, method}) {
  let color = 'badge--secondary';
  switch (method) {
    case 'get':
      color = 'badge--success';
      break;
    case 'post':
      color = 'badge--warning';
      break;
    case 'put':
      color = 'badge--info';
      break;
    case 'delete':
      color = 'badge--danger';
      break;
  }
  return (
    <div>
      <span className={clsx('badge', color)}>{method.toUpperCase()}</span>
    </div>
  );
}

export function FormadocsEndpoint ({endpoint, method}) {
  const {data} = useAsync({ promiseFn: parser, api: OpenAPI});
  if (data) {
    const url = (data.servers) ? data.servers[0].url : '';
    return (
      <div>
        {`${url}${endpoint}`}
      </div>
    );
  }
  return null;
}

export function FormadocsParameters ({endpoint, method}) {
  const {data} = useAsync({ promiseFn: parser, api: OpenAPI});
  if (data) {
    const resource = data.paths[endpoint][method];
    if (resource.parameters) {
      return (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Required</th>
              <th>Description</th>
              <th>Deprecated</th>
            </tr>
          </thead>
          <tbody>
            {resource.parameters.map((params, idx) => (
              <tr key={idx}>
                <td>{params.in}</td>
                <td>{params.name}</td>
                <td><code>{String(!!params.required)}</code></td>
                <td>{params.description}</td>
                <td><code>{String(!!params.deprecated)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
  return null;
}

export function FormadocsRequestBody ({endpoint, method}) {
  const {data} = useAsync({ promiseFn: parser, api: OpenAPI});
  if (data) {
    const resource = data.paths[endpoint][method];
    if (resource.requestBody) {
      return (
        <div>
          <div>{resource.requestBody.description}</div>
          <div>Required: <code>{String(!!resource.requestBody.required)}</code></div>
          <ul>
            {Object.entries(resource.requestBody.content).map(([content, params], idx) => (
              <li key={content}>{content}</li>
            ))}
          </ul>
        </div>
      )
    }
  }
  return null;
}

export function FormadocsResponses ({endpoint, method}) {
  const {data} = useAsync({ promiseFn: parser, api: OpenAPI});
  if (data) {
    const resource = data.paths[endpoint][method];
    if (resource.responses) {
      return (
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resource.responses).map(([code, params], idx) => (
              <tr key={idx}>
                <td>{code}</td>
                <td>{params.description}</td>
                <td>{params.links}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
  return null;
}
