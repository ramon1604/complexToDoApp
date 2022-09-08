
function enaBtn(id) {
    document.getElementById(id).disabled = false;
}

async function alertMsg(title, text, icon, buttons, mode, formId) {
    await swal(
        {
            title: title,
            text: text,
            icon: icon,
            buttons: buttons,
            dangerMode: mode
        }).then(
            (value) => {
                if (value) { document.getElementById(formId).submit() };
            }
        )
}