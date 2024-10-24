import React from 'react';

const Contact = () => {
    const contacts = [
        {
            category: 'Bus Service',
            details: [
                { name: 'Mr. Mukesh', number: '9782008380' },
                { name: 'S. Parasher', number: '9414021988' },
            ],
        },
        {
            category: 'Bus Driver',
            details: [
                { name: 'Soji Ram', number: '7568250353' },
                { name: 'Mohan', number: '9875832109' },
            ],
        },
        {
            category: 'Auto & Cab Services',
            details: [
                { name: 'Balbir Singh', number: '9928310254' },
                { name: 'Chandra Autos', number: '982875208' },
            ],
        },
    ];

    return (
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Contact Information</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {contacts.map((contact, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{contact.category}</h2>
                        <ul className="list-disc list-inside">
                            {contact.details.map((detail, idx) => (
                                <li key={idx} className="text-gray-600">
                                    <span className="font-bold">{detail.name}:</span> {detail.number}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
