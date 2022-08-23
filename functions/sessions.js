exports.sessionSave = (req, res, msgs, msgType) => {
    if (msgs === 'ok') {''} else {req.flash(msgType, msgs)}
    req.session.save(() => res.redirect('/'))
}