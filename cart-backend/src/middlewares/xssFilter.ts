import { Request, Response, NextFunction } from 'express'
import xssFilters from 'xss-filters'

function xssFilterMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.query) {
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        req.query[key] = xssFilters.uriQueryInHTMLData(req.query[key] as string)
      }
    }
  }

  if (req.body) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = xssFilters.inHTMLData(req.body[key])
      }
    }
  }

  next()
}

export default xssFilterMiddleware
