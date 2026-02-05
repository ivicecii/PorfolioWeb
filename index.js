function mostrarSeccion(id) {
    let secciones = document.querySelectorAll(".seccion");

    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("oculto");
    }

    document.getElementById(id).classList.remove("oculto");
}
let imagenes = [];
let indice = 0;
function mostrarMedia() {
    let contenedor = document.getElementById("lightbox-img");
    contenedor.innerHTML = "";

    let ruta = imagenes[indice];

    if (ruta.endsWith(".mp4") || ruta.endsWith(".webm")) {

        let video = document.createElement("video");
        video.src = ruta;
        video.controls = true;
        video.autoplay = true;
        video.className = "media-grande";

        contenedor.appendChild(video);

    } else {

        let img = document.createElement("img");
        img.src = ruta;
        img.className = "media-grande";

        contenedor.appendChild(img);
    }
}

function abrirGaleria(listaImgs) {
    imagenes = listaImgs;
    indice = 0;

    mostrarMedia();
    document.getElementById("lightbox").classList.remove("oculto");

    document.getElementById("flecha-izq").classList.remove("oculto");
    document.getElementById("flecha-der").classList.remove("oculto");
}
document.addEventListener("click", function(e) {
    let lb = document.getElementById("lightbox");

    if (e.target === lb) {
        lb.classList.add("oculto");
        document.getElementById("flecha-izq").classList.add("oculto");
        document.getElementById("flecha-der").classList.add("oculto");
    }
});

function cambiarImg(direccion) {
    indice += direccion;

    if (indice < 0) indice = imagenes.length - 1;
    if (indice >= imagenes.length) indice = 0;

    mostrarMedia();
}
document.addEventListener("click", function(e) {
    let lb = document.getElementById("lightbox");
    if (e.target === lb) {
        lb.classList.add("oculto");
    }
});
let modoOscuro = true;

function cambiarTema() {
    const root = document.documentElement;
    const icono = document.getElementById("toggleTema");
    const git = document.getElementById("dark");
    const git2 = document.getElementById("dark2");
    const gif = document.getElementById("gif");

    if (modoOscuro) {
        root.style.setProperty('--fondo', '#fcfcfc');
        root.style.setProperty('--texto', '#111111');
        icono.src = "img/Iconos/Luna.png";
        git.src="img/Iconos/gitdark.png"
        git2.src="img/Iconos/gitdark.png"
        gif.style.filter = "invert(1)";
        modoOscuro = false;
    } else {
        root.style.setProperty('--fondo', '#111111');
        root.style.setProperty('--texto', '#fcfcfc');
        icono.src = "img/Iconos/Sol.png";
        git.src="img/Iconos/git.png"
        git2.src="img/Iconos/git.png"
        gif.style.filter = "invert(0)";
        modoOscuro = true;
    }
}
//clicker !!!!!!
let puntos = 0;
let multiClick = 1;
let auto = 1;
let explosionActiva = false;
let marcador = document.getElementById("puntosHeader");

function actualizar() {
    marcador.textContent = puntos;

}
document.addEventListener("click", function() {
    puntos += multiClick;
    actualizar();

});
function comprarMultiClick() {
    if (puntos >= 50) {
        puntos -= 50;
        multiClick++;
        actualizar();
    }
}

function comprarAutoClick() {
    if (puntos >= 100) {
        puntos -= 100;
        auto++;
        actualizar();
    }
}
function comprarExplosion() {
    if (puntos >= 1000 && !explosionActiva) {
        puntos -= 1000;
        explosionActiva = true;
        actualizar();
    }
}
setInterval(function() {
    if (auto > 0) {
        puntos += auto;
        actualizar();
    }
}, 1000);
function crearParticulas(rect) {

    let tamanoBase = Math.max(rect.width, rect.height);

    let cantidad = Math.floor(tamanoBase / 10);
    if (cantidad < 8) cantidad = 8;
    if (cantidad > 40) cantidad = 40;

    for (let i = 0; i < cantidad; i++) {

        let p = document.createElement("div");
        p.className = "particula";
        let size = Math.max(4, tamanoBase / 25);
        p.style.width = size + "px";
        p.style.height = size + "px";

        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;

        p.style.left = x + "px";
        p.style.top = y + "px";

        let rango = tamanoBase * 1.2;

        let movX = (Math.random() - 0.5) * rango + "px";
        let movY = (Math.random() - 0.5) * rango + "px";

        p.style.setProperty("--x", movX);
        p.style.setProperty("--y", movY);

        document.body.appendChild(p);

        setTimeout(() => p.remove(), 700);
    }
}
document.querySelectorAll(".objeto").forEach(obj => {
    obj.addEventListener("click", function() {

        if (explosionActiva) {

            let rect = obj.getBoundingClientRect();
            crearParticulas(rect);

            obj.classList.add("explotar");

            setTimeout(() => {
                obj.style.display = "none";
            }, 300);
        }

    });
});