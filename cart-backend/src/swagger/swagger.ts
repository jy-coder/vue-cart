import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import log from './logger'

import path from 'path'
import { dereference } from '@apidevtools/json-schema-ref-parser'

async function swaggerDocs(app: Express, port: number) {
  // Add more paths and file paths here as needed
  const apiPaths = {
    '/docs/auth': '../../openapi/auth.yaml'
  }
  for (const [endpoint, filePath] of Object.entries(apiPaths)) {
    const authApiPath = path.join(__dirname, filePath)
    const swaggerDocument: any = await loadOpenAPI(authApiPath)

    if (swaggerDocument) {
      app.use(endpoint, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      log.info(`Docs available at http://localhost:${port}${path}`)
    }
  }

  log.info(`Docs available at http://localhost:${port}/docs`)
}

async function loadOpenAPI(path: string) {
  try {
    const api = await dereference(path)
    return api
  } catch (err) {
    console.error('Error loading OpenAPI document:', err)
    return null
  }
}

export default swaggerDocs
