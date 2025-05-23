import React, { useState } from 'react';

const BookTicket = () => {
    const [showPassengerForm, setShowPassengerForm] = useState(true);

    const trains = [
        { number: '12301', name: 'Rajdhani Express' },
        { number: '12001', name: 'Shatabdi Express' },
        { number: '12245', name: 'Duronto Express' },
        { number: '12909', name: 'Garib Rath' },
        { number: '22119', name: 'Tejas Express' },
        { number: '22436', name: 'Vande Bharat Express' },
        { number: '12071', name: 'Jan Shatabdi' },
        { number: '12931', name: 'Double Decker' },
        { number: '12595', name: 'Humsafar Express' },
        { number: '12731', name: 'Intercity Express' },
        { number: '12345', name: 'Superfast Express' },
        { number: '13005', name: 'Mail Express' },
        { number: '54729', name: 'Passenger Special' },
        { number: '12907', name: 'Sampark Kranti' },
        { number: '22877', name: 'Antyodaya Express' },
        { number: '13015', name: 'Kavi Guru Express' },
        { number: '22417', name: 'Mahamana Express' },
        { number: '12247', name: 'Yuva Express' },
        { number: '22666', name: 'Uday Express' },
        { number: '12369', name: 'Kumbh Express' },
        { number: '12779', name: 'Goa Express' },
        { number: '12137', name: 'Punjab Mail' },
        { number: '14033', name: 'Jammu Mail' },
        { number: '12123', name: 'Deccan Queen' },
        { number: '12621', name: 'Chennai Express' },
        { number: '10103', name: 'Mandovi Express' },
        { number: '16345', name: 'Netravati Express' },
        { number: '12627', name: 'Karnataka Express' },
        { number: '12449', name: 'Goa Sampark Kranti' },
        { number: '18477', name: 'Utkal Express' },
        { number: '12622', name: 'Tamil Nadu Express' },
        { number: '12393', name: 'Sampoorna Kranti' },
        { number: '19037', name: 'Avadh Express' },
        { number: '12471', name: 'Swaraj Express' },
        { number: '12859', name: 'Gitanjali Express' },
        { number: '12809', name: 'Howrah Mail' },
        { number: '12801', name: 'Purushottam Express' },
        { number: '12887', name: 'Puri Express' },
        { number: '12723', name: 'Secunderabad Express' },
        { number: '19407', name: 'Ahmedabad Express' },
        { number: '16210', name: 'Ajmer Express' },
        { number: '12645', name: 'Nizamuddin Express' },
        { number: '15905', name: 'Vivek Express' },
        { number: '15635', name: 'Kaziranga Express' },
        { number: '12575', name: 'Sikkim Express' },
        { number: '12343', name: 'Darjeeling Mail' },
        { number: '16231', name: 'Mysuru Express' },
        { number: '12671', name: 'Nilgiri Express' },
        { number: '19019', name: 'Dehradun Express' },
        { number: '17315', name: 'Goa Link Express' }
    ];

    const classTypes = [
        { id: 'SL', name: 'Sleeper' },
        { id: '3A', name: 'AC 3-tier' },
        { id: '2A', name: 'AC 2-tier' },
        { id: '1A', name: 'First Class' },
        { id: '2S', name: 'Second Class' },
    ];

    const paymentModes = [
        'Credit Card',
        'Debit Card',
        'UPI',
        'Net Banking',
        'Cash',
    ];

    const [formData, setFormData] = useState({
        p_name: '',
        p_age: '',
        p_gender: '',
        p_concession_category: 'none',
        p_train_number: '',
        p_class_type: '',
        p_journey_date: '',
        p_payment_mode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const response = await fetch('http://localhost:3000/users/book_ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            // console.log(data);

            if (data.success) {
                alert('Ticket Booked Successfully!');
                const pnr = data.pnr;
                const passenger_id = data.p_id;
                localStorage.setItem('p_id', passenger_id);
                // console.log(localStorage.getItem('p_id'));
                alert(`your pnr is ${pnr}`);
                setFormData({
                    p_name: '',
                    p_age: '',
                    p_gender: '',
                    p_concession_category: 'none',
                    p_train_number: '',
                    p_class_type: '',
                    p_journey_date: '',
                    p_payment_mode: '',
                });
            } else {
                alert('Booking failed! Please try again.');
            }
        } catch (error) {
            console.error('Error booking ticket:', error);
            alert('There was an error. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Train Ticket</h1>

                {showPassengerForm && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Details</h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="p_name"
                                        value={formData.p_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input
                                        type="number"
                                        name="p_age"
                                        value={formData.p_age}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        name="p_gender"
                                        value={formData.p_gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Concession Type</label>
                                    <select
                                        name="p_concession_category"
                                        value={formData.p_concession_category}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="none">None</option>
                                        <option value="senior">Senior Citizen</option>
                                        <option value="student">Student</option>
                                        <option value="military">Military</option>
                                        <option value="divyang">Divyang</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Train</label>
                                    <select
                                        name="p_train_number"
                                        value={formData.p_train_number}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select Train</option>
                                        {trains.map((train) => (
                                            <option key={train.number} value={train.number}>
                                                {train.number} ({train.name})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Type</label>
                                    <select
                                        name="p_class_type"
                                        value={formData.p_class_type}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select Class</option>
                                        {classTypes.map((cls) => (
                                            <option key={cls.id} value={cls.name}>{cls.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Journey Date</label>
                                    <input
                                        type="date"
                                        name="p_journey_date"
                                        value={formData.p_journey_date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                                    <select
                                        name="p_payment_mode"
                                        value={formData.p_payment_mode}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select Payment Mode</option>
                                        {paymentModes.map((mode) => (
                                            <option key={mode} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPassengerForm(false)}
                                    className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTicket;
