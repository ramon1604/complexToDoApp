function sessionSave(req, res, msgs, msgType) {
    if (msgs === 'ok') { '' } else { req.flash(msgType, msgs) }
    req.session.save(() => res.redirect('/'))
}

function isLoggedin(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        sessionSave(req, res, ['Login required for this action'], 'errors')
    }
}

module.exports = { sessionSave, isLoggedin }
