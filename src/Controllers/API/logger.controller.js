
export const getLogger = (req, res) => {
    req.logger.fatal("Prueba de logger nivel fatal en endpoint")
    req.logger.error("Prueba de logger nivel error en endpoint");
    req.logger.warning("Prueba de logger nivel warning en endpoint");
    req.logger.info("Prueba de logger nivel info en endpoint");
    req.logger.http("Prueba de logger nivel http en endpoint");
    req.logger.debug("Prueba de logger nivel debug en endpoint");
    res.send("Prueba de logger controller")
}