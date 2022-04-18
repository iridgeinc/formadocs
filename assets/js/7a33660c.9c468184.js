(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{76:function(n,e,t){"use strict";t.r(e),t.d(e,"frontMatter",(function(){return a})),t.d(e,"metadata",(function(){return r})),t.d(e,"toc",(function(){return p})),t.d(e,"default",(function(){return m}));var i=t(3),o=t(7),s=(t(0),t(90)),a={id:"definition",title:"Definition"},r={unversionedId:"definition",id:"definition",isDocsHomePage:!1,title:"Definition",description:"Definition",source:"@site/docs/definition.md",slug:"/definition",permalink:"/formadocs/docs/definition",version:"current",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/formadocs/docs/installation"},next:{title:"Usage",permalink:"/formadocs/docs/usage"}},p=[{value:"Definition",id:"definition",children:[]},{value:"Precautions",id:"precautions",children:[]}],c={toc:p};function m(n){var e=n.components,t=Object(o.a)(n,["components"]);return Object(s.b)("wrapper",Object(i.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(s.b)("h3",{id:"definition"},"Definition"),Object(s.b)("p",null,"Prepare the OpenAPI file to create the document.\nThis time we will use example/openapi.json as an example."),Object(s.b)("h4",{id:"exampleopenapijson"},"example/openapi.json"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-json"},'{\n  "openapi": "3.0.2",\n  "info": {\n    "title": "FastAPI",\n    "version": "0.1.0"\n  },\n  "servers": [{\n    "url": "http://api.example.com"\n  }],\n  "paths": {\n    "/items/{item_id}": {\n      "get": {\n        "summary": "Item Get",\n        "operationId": "item_getitems__item_id__get",\n        "parameters": [\n          {\n            "required": true,\n            "schema": {\n              "title": "Item Id",\n              "type": "integer"\n            },\n            "name": "item_id",\n            "in": "path"\n          }\n        ],\n        "responses": {\n          "200": {\n            "description": "Successful Response",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/Item"\n                }\n              }\n            }\n          },\n          "422": {\n            "description": "Validation Error",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/HTTPValidationError"\n                }\n              }\n            }\n          }\n        }\n      }\n    },\n    "/items": {\n      "get": {\n        "tags": [\n          "foo"\n        ],\n        "summary": "Item List",\n        "operationId": "item_listitems_get",\n        "parameters": [\n          {\n            "required": false,\n            "schema": {\n              "title": "Limit",\n              "type": "integer",\n              "default": 20\n            },\n            "name": "limit",\n            "in": "query"\n          }\n        ],\n        "responses": {\n          "200": {\n            "description": "Successful Response",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "title": "Response Item Listitems Get",\n                  "type": "array",\n                  "items": {\n                    "$ref": "#/components/schemas/Item"\n                  }\n                }\n              }\n            }\n          },\n          "422": {\n            "description": "Validation Error",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/HTTPValidationError"\n                }\n              }\n            }\n          }\n        }\n      },\n      "post": {\n        "summary": "Item Post",\n        "operationId": "item_postitems_post",\n        "requestBody": {\n          "content": {\n            "application/json": {\n              "schema": {\n                "$ref": "#/components/schemas/Item"\n              }\n            }\n          },\n          "required": true\n        },\n        "responses": {\n          "201": {\n            "description": "Successful Response",\n            "content": {\n              "application/json": {\n                "schema": {}\n              }\n            }\n          },\n          "422": {\n            "description": "Validation Error",\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/HTTPValidationError"\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  },\n  "components": {\n    "schemas": {\n      "HTTPValidationError": {\n        "title": "HTTPValidationError",\n        "type": "object",\n        "properties": {\n          "detail": {\n            "title": "Detail",\n            "type": "array",\n            "items": {\n              "$ref": "#/components/schemas/ValidationError"\n            }\n          }\n        }\n      },\n      "Item": {\n        "title": "Item",\n        "required": [\n          "name",\n          "value"\n        ],\n        "type": "object",\n        "properties": {\n          "name": {\n            "title": "Name",\n            "type": "string"\n          },\n          "value": {\n            "title": "Value",\n            "type": "integer"\n          }\n        }\n      },\n      "ValidationError": {\n        "title": "ValidationError",\n        "required": [\n          "loc",\n          "msg",\n          "type"\n        ],\n        "type": "object",\n        "properties": {\n          "loc": {\n            "title": "Location",\n            "type": "array",\n            "items": {\n              "type": "string"\n            }\n          },\n          "msg": {\n            "title": "Message",\n            "type": "string"\n          },\n          "type": {\n            "title": "Error Type",\n            "type": "string"\n          }\n        }\n      }\n    }\n  }\n}\n')),Object(s.b)("h3",{id:"precautions"},"Precautions"),Object(s.b)("h4",{id:"path-segment-starting-with-an-underscore"},"Path segment starting with an underscore"),Object(s.b)("p",null,"Note that if the path segment provides an API that starts with an underscore,\nfor example, ",Object(s.b)("inlineCode",{parentName:"p"},"_search")," will be excluded by the default docusaurus behavior."),Object(s.b)("p",null,"As mentioned in ",Object(s.b)("a",{parentName:"p",href:"https://github.com/facebook/docusaurus/pull/5173"},"the pull request"),",\nif you are exposing an API that contains a path segment that starts with an underscore,\nyou can get the expected behavior by removing the prefix rule that starts with an underscore from the exclude configuration."))}m.isMDXComponent=!0}}]);