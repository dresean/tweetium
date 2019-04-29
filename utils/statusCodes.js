// simple status code objects
module.exports = {
    success: {
        ok: 200,
        created: 201,
        accepted: 202,
        noContent: 204,
        resetContent: 205
    },
    redirection: {
        movedPermanently: 301,
        found: 302,
        temporarilyRedirect: 307,
        permanentRedirect: 308
    },
    clientError: {
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        requestTimeout: 408
    },
    serverError: {
        internalServerError: 500,
        badGateway: 502,
        serviceUnavailable: 503
    }
}