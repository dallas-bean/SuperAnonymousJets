function reveal(targetID) {
    let target = document.getElementById(targetID);
    const subMenus = document.querySelectorAll('.submenu');

    subMenus.forEach(submenu => {
        if (submenu.id !== targetID) {
            submenu.classList.add('hidden');
        }
    });

    target.classList.toggle("hidden");
}