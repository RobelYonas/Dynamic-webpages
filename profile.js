class User {
    constructor(id, firstName, lastName, email, phone, image, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.address = address;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get fullAddress() {
        return `${this.address.address}, ${this.address.city}`;
    }
}
const fetchuUser = async () => {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        const userContainer = document.getElementById('user-info');

        data.users.forEach(userData => {
            // Create an instance of User
            const user = new User(
                userData.id,
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.phone,
                userData.image,
                userData.address
            );

            // Use the user instance to create the user card
            const userCard = document.createElement('div');
            userCard.className = 'user-Card';

            const image = document.createElement('img');
            image.src = user.image;
            userCard.appendChild(image);

            const info = document.createElement('div');
            info.className = 'userinfo';
            info.innerHTML = `
                <p><strong>Name:</strong> ${user.fullName}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Address:</strong> ${user.fullAddress}</p>
            `;
            userCard.appendChild(info);
            userContainer.appendChild(userCard);
        });

    } catch (error) {
        console.error(error); // Use console.error for error logging
    }
}

fetchuUser();
