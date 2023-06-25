/*
 * @Author: komens
 * @Date: 2022-12-09 15:37:47
 * @LastEditTime: 2023-01-29 16:24:57
 * @LastEditors: pinguo-xujian
 */

export default {
  'get /v1/goto/configs/:posId': {
    request: () => {},
    response: (data: any) => {
      return data;
    },
  },
  'get /v3/materials/:type': {
    response: (data: any) => {
      return data;
    },
  },
  'get /v3/materials/:type/:id': {
    request: () => {},
    response: (data: any) => {
      return data;
    },
  },
  'post /v3/materials/:materialType/materials': {
    response: (data: any) => {
      if (data.entities) {
      }
      return data;
    },
  },
  'get /v3/materials/:materialType': {
    response: (data: any) => {
      if (data.entities) {
      }
      return data;
    },
  },
  'get /v3/materials/:materialType/:posId/material': {
    response: (data: any) => {
      if (data.entities) {
      }
      return data;
    },
  },
  'get /v3/materials/:parentMaterialId/children': {
    response: (data: any) => {
      if (data.entities) {
      }
      return data;
    },
  },
};
