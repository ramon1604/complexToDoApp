exports.sessionSave = (req, res, msgs) => {
    (msgs === 'ok') ? '' : req.flash('errors', msgs)
    req.session.save(() => res.redirect('/'))
    // console.log(req.session.flash.errors)
}