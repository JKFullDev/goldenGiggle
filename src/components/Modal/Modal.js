// src/components/Modal/Modal.js
import './Modal.css';
import Swal from 'sweetalert2';  // Aunque usamos Swal, este es para modales custom

const Modal = (content = '') => {  // Función con contenido opcional
    const modal = document.createElement('div');  // Crea overlay
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal__content">
                ${content}  <!-- Contenido dinámico -->
                <button class="modal__close" data-action="close">&times;</button>  <!-- Cierre X -->
            </div>
        </div>
    `;

    // Event listeners
    modal.querySelector('[data-action="close"]').addEventListener('click', () => {  // Cierra con X
        modal.remove();  // Borra del DOM
    });

    modal.addEventListener('click', (e) => {  // Cierra si se hace click en overlay
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);  // Inserta en body

    return modal;
};

export default Modal;