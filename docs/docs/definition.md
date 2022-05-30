---
id: definition
title: Definition
---

### Definition
Prepare the OpenAPI file to create the document.
This time we will use example/openapi.json as an example.

#### example/openapi.json

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "FastAPI",
    "version": "0.1.0"
  },
  "servers": [{
    "url": "http://api.example.com"
  }],
  "paths": {
    "/items/{item_id}": {
      "get": {
        "summary": "Item Get",
        "operationId": "item_getitems__item_id__get",
        "parameters": [
          {
            "required": true,
            "schema": {
              "title": "Item Id",
              "type": "integer"
            },
            "name": "item_id",
            "in": "path"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Item"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/items": {
      "get": {
        "tags": [
          "foo"
        ],
        "summary": "Item List",
        "operationId": "item_listitems_get",
        "parameters": [
          {
            "required": false,
            "schema": {
              "title": "Limit",
              "type": "integer",
              "default": 20
            },
            "name": "limit",
            "in": "query"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Item Listitems Get",
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Item"
                  }
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Item Post",
        "operationId": "item_postitems_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Item"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "HTTPValidationError": {
        "title": "HTTPValidationError",
        "type": "object",
        "properties": {
          "detail": {
            "title": "Detail",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            }
          }
        }
      },
      "Item": {
        "title": "Item",
        "required": [
          "name",
          "value"
        ],
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string"
          },
          "value": {
            "title": "Value",
            "type": "integer"
          }
        }
      },
      "ValidationError": {
        "title": "ValidationError",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "type": "object",
        "properties": {
          "loc": {
            "title": "Location",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "msg": {
            "title": "Message",
            "type": "string"
          },
          "type": {
            "title": "Error Type",
            "type": "string"
          }
        }
      }
    }
  }
}
```

### Precautions

#### Path segment starting with an underscore

Note that if the path segment provides an API that starts with an underscore,
for example, `_search` will be excluded by the default docusaurus behavior.

As mentioned in [the pull request](https://github.com/facebook/docusaurus/pull/5173),
if you are exposing an API that contains a path segment that starts with an underscore,
you can get the expected behavior by removing the prefix rule that starts with an underscore from the exclude configuration.

##### For example

The following shows the insertion position of the corresponding example.

* docusaurus.config.js

```javascript
module.exports = {
  presets: [
    [
      {
        docs: {
          exclude: [
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ]
        },
      },
    ],
  ],
};
```
