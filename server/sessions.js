function sessionSave(req, res, msgs, msgType, redirect, data) {
    if (msgs === 'ok') { '' } else { req.flash(msgType, msgs) }
    if (data) {
        msgType == 'success' ? res.locals.success = req.flash(msgType) : res.locals.errors = req.flash(msgType)
        req.session.save(() => res.render(redirect, data))
    } else {
        req.session.save(() => res.redirect(redirect))
    }
}

function isLoggedin(req, res, next) {
    if (res.locals.user) {
        next()
    } else {
        sessionSave(req, res, ['Login required to continue'], 'errors', '/', false)
    }
}

module.exports = { sessionSave, isLoggedin }
