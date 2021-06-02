import React from 'react';
import OpenAPI from './openapi.json';

import SwaggerParser from "@apidevtools/swagger-parser";
import { useAsync } from "react-async"

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
  return (
    <div>
      <span className="badge badge--secondary">{method.toUpperCase()}</span>
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
                <td>{String(!!params.required)}</td>
                <td>{params.description}</td>
                <td>{String(!!params.deprecated)}</td>
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
          <div>Required: {String(!!resource.requestBody.required)}</div>
          <div>
            {Object.entries(resource.requestBody.content).map(([content, params], idx) => (
              <div>{content}</div>
            ))}
          </div>
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
