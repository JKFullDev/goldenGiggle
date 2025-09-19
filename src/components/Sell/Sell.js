// src/components/Sell/Sell.js
import './Sell.css';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const Sell = () => {
    const sellMain = document.createElement('main');
    sellMain.className = 'sell';
    sellMain.id = 'sell';

    sellMain.innerHTML = `
        <section class="sell__header">
            <div class="container">
                <h2 class="sell__title">Schedule an Appraisal</h2>
                <p class="sell__subtitle">Get a professional valuation for your gold or silver. Book an appointment today.</p>
                <button class="btn btn--secondary back-btn" data-route="home">← Back to Home</button>
            </div>
        </section>

        <section class="sell__form-section">
            <div class="container">
                <form class="appointment-form" id="appointment-form">
                    <div class="form-group">
                        <label for="full-name">Full Name *</label>
                        <input type="text" id="full-name" name="fullName" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    
                    <div class="form-group">
                        <label for="metal-type">Metal Type *</label>
                        <select id="metal-type" name="metalType" required>
                            <option value="">Select Metal</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="estimated-weight">Estimated Weight (grams)</label>
                        <input type="number" id="estimated-weight" name="estimatedWeight" min="1" step="0.1">
                    </div>
                    
                    <div class="form-group">
                        <label for="preferred-date">Preferred Date *</label>
                        <input type="date" id="preferred-date" name="preferredDate" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="preferred-time">Preferred Time *</label>
                        <select id="preferred-time" name="preferredTime" required>
                            <option value="">Select Time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Additional Notes</label>
                        <textarea id="message" name="message" rows="4" placeholder="Any details about your items..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn--primary submit-btn">Book Appointment</button>
                </form>
            </div>
        </section>
    `;

    // Event listener para back to home
    sellMain.querySelector('[data-route="home"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.router.navigate('home');
    });

    // Manejo del formulario
    const form = sellMain.querySelector('#appointment-form');
    form.addEventListener('submit', (e) => {   //Previene submit nativo
        e.preventDefault();   //Evita recarga página

        const formData = new FormData(form);  //Obtiene datos del formulario
        const appointment = {  //Se crea un objeto con los datos
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            metalType: formData.get('metalType'),
            estimatedWeight: formData.get('estimatedWeight'),
            preferredDate: formData.get('preferredDate'),
            preferredTime: formData.get('preferredTime'),
            message: formData.get('message'),
            bookedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        };

        // Simular guardado en localStorage (falso backend)
        const appointments = JSON.parse(localStorage.getItem('golden-giggle-appointments') || '[]');  //Array existente
        appointments.push(appointment);  //Agrega nuevos datos de este form
        localStorage.setItem('golden-giggle-appointments', JSON.stringify(appointments));  //Se guarda

        Swal.fire({  //Alerta de coonfirmación
            icon: 'success',
            title: 'Appointment Booked!',
            html: `
                <p>Thank you, <strong>${appointment.fullName}</strong>!</p>
                <p>Your appraisal for <strong>${appointment.metalType}</strong> is scheduled for <strong>${appointment.preferredDate} at ${appointment.preferredTime}</strong>.</p>
                <p>We'll send a confirmation to <strong>${appointment.email}</strong>.</p>
            `,
            confirmButtonText: 'Great!'
        }).then(() => {  //Después de cerrar, limpia el formulario y se vuelve a Home
            form.reset();
            window.router.navigate('home');
        });
    });

    // Establecer fecha mínima (hoy)
    const today = dayjs().format('YYYY-MM-DD');
    sellMain.querySelector('#preferred-date').min = today;

    return sellMain;
};

export default Sell;