import type { BaseProductLite, BaseProduct } from "$lib/types/app/product"
import type { Agent, AgentLite, Customer, CustomerLite } from "$lib/types/app/user";
import type { PurchaseOrder, SaleOrder } from "$lib/types/app/order";
import type { Message } from "$lib/types/app";

export const messagesList: Message[] = [
    // Conversation with Customer 1 (Mary Jones)
    {
        id: "msg_001",
        senderId: "cust_001",
        recipientId: "agent_001",
        content: "Hi John, I saw your Wireless Headphones sale. Are they still available?",
        read: true, timestamp: new Date("2025-03-10T10:00:00Z")
    },
    {
        id: "msg_002",
        senderId: "agent_001",
        recipientId: "cust_001",
        content: "Hi Mary, yes, the headphones are still available! The final price is $129.99. Would you like me to reserve them for you?",
        read: true, timestamp: new Date("2025-03-10T10:15:00Z")
    },
    {
        id: "msg_003",
        senderId: "cust_001",
        recipientId: "agent_001",
        content: "Great, please reserve them. Also, I put in a purchase order for USB cables - can you check on that?",
        read: true, timestamp: new Date("2025-03-12T14:30:00Z")
    },
    {
        id: "msg_004",
        senderId: "agent_001",
        recipientId: "cust_001",
        content: "Headphones are reserved! For the USB cables, they're available and I'll process that order soon. Expect an update by tomorrow.",
        read: true, timestamp: new Date("2025-03-12T15:00:00Z")
    },

    // Conversation with Customer 2 (Peter Parker)
    {
        id: "msg_005",
        senderId: "agent_001",
        recipientId: "cust_002",
        content: "Hi Peter, I noticed your purchase order for a phone case. The specific one you referenced isn’t available yet - would you like me to source an alternative?",
        read: true, timestamp: new Date("2025-03-16T09:00:00Z")
    },
    {
        id: "msg_006",
        senderId: "cust_002",
        recipientId: "agent_001",
        content: "Hey John, thanks for checking. Yes, please find a similar clear case for iPhone 14 Pro if possible.",
        read: true, timestamp: new Date("2025-03-16T09:30:00Z")
    },
    {
        id: "msg_007",
        senderId: "agent_001",
        recipientId: "cust_002",
        content: "Got it, Peter. I’ll look into it and get back to you by end of day with options.",
        read: true, timestamp: new Date("2025-03-16T10:00:00Z")
    },

    // Conversation with Customer 3 (Sarah Connor)
    {
        id: "msg_008",
        senderId: "cust_003",
        recipientId: "agent_001",
        content: "Hello, I’m interested in the Smart Watch deal you posted. Can you tell me more about its features?",
        read: true, timestamp: new Date("2025-03-05T13:00:00Z")
    },
    {
        id: "msg_009",
        senderId: "agent_001",
        recipientId: "cust_003",
        content: "Hi Sarah, the Smart Watch tracks fitness metrics like steps, heart rate, and sleep. It’s priced at $89.99 and I can ship it immediately. Interested?",
        read: true, timestamp: new Date("2025-03-05T13:20:00Z")
    },
    {
        id: "msg_010",
        senderId: "cust_003",
        recipientId: "agent_001",
        content: "That sounds perfect. Please go ahead and ship it. Thanks!",
        read: false, timestamp: new Date("2025-03-05T13:45:00Z")
    },
    {
        id: "msg_010",
        senderId: "cust_003",
        recipientId: "agent_001",
        content: "I should say I think you're doing a great job",
        read: false, timestamp: new Date("2025-03-05T13:48:00Z")
    },
    {
        id: "msg_011",
        senderId: "agent_001",
        recipientId: "cust_003",
        content: "Order confirmed, Sarah! It’s shipped and you should receive it by March 20th. Let me know if you need anything else.",
        read: true, timestamp: new Date("2025-03-05T14:00:00Z")
    },
    {
        id: "msg_010",
        senderId: "cust_003",
        recipientId: "agent_001",
        content: ";)",
        read: false, timestamp: new Date("2025-03-05T13:49:00Z")
    },
    {
        id: "msg_011",
        senderId: "agent_001",
        recipientId: "cust_003",
        content: "Thanks. Please leave me a review.",
        read: true, timestamp: new Date("2025-03-05T14:01:00Z")
    },
];

export const products: Array<BaseProductLite> = [
    {
        name: "iphone 16",
        image: "https://lh3.googleusercontent.com/d/1D7KGi7JSl1Di23UTfA6JfAdhFoHSn-1x",
        condition: {
            name: "",
            inspected: false,
            description: ""
            },
        price: 230
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1o7MIQW0tXvwx1F6gYpQbAY76EW8iAXuQ",
        condition: {
            name: "",
            inspected: false,
            description: ""
            },
        price: 605
    },
    {
        name: "iphone 16",
        image: "https://lh3.googleusercontent.com/d/1C4tpJ83xqcly4ksDWUFCvaYcJ_hMh-SG",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 400
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1D7KGi7JSl1Di23UTfA6JfAdhFoHSn-1x",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 20
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1C4tpJ83xqcly4ksDWUFCvaYcJ_hMh-SG",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 12000
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1C4tpJ83xqcly4ksDWUFCvaYcJ_hMh-SG",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 250500
    },
    {
        name: "2015 toyota camry",
        image: "https://lh3.googleusercontent.com/d/1KQLzE3yuXFlylrNcLbyDKzVbupi2hLS0",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 1100000
    },
    {
        name: "2012 toyota camry",
        image: "https://lh3.googleusercontent.com/d/1YBZqMd2IK4iWvQ-Ui908AWSSBZjvoeyV",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 123000
    },
    {
        name: "mirrorless camera lens",
        image: "https://lh3.googleusercontent.com/d/1LdihXhzAdyeTYhzmWGxK0tvA24qSQywZ",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 250000
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1C4tpJ83xqcly4ksDWUFCvaYcJ_hMh-SG",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 12000
    },
    {
        name: "hp omen 17",
        image: "https://lh3.googleusercontent.com/d/1-jOnf20gPtAKd-zv0Q8DHgoFVYfXDPn2",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 13050
    },
    {
        name: "iphone 15",
        image: "https://lh3.googleusercontent.com/d/1_cbKlrNpaz6-LKeLRHfpTkd-9ws-vI8o",
        condition: {
name: "",
inspected: false,
description: ""
},
        price: 2300
    },
]

// Agents
export const agent1: Agent = {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "hashed_password_123",
    id: "agent_001",
    fName: "John",
    lName: "Doe",
    gender: "male",
    profilePhoto: "https://lh3.googleusercontent.com/d/1fE_CBZr0M2IWN5jUzCPdzPgCKDEFHfrE",
    dob: new Date("1985-06-15"),
    phoneNumber: "+1-555-0123",
    face: {}, // Empty as FaceMapping is not fully defined
    location: "New York, NY",
    about: "Experienced sales agent with 5+ years in the field",
    isPhoneNumberVerified: true,
    isPersonalIdVerified: true,
    isEmailVerified: true,
    orders: [],
    tier: {
        name: "Gold",
        description: "Top-tier agent with premium benefits"
    },
    reviews: [
        { authorId: "", rating: 5, comment: "Excellent service!" },
        { authorId: "", rating: 4 },
        { authorId: "", rating: 2, comment: "Service was good but can be much better. He didn't pick up when I first called and I had to call again and again." },
        { authorId: "", rating: 5, comment: "Excellent service!" },
        { authorId: "", rating: 5, comment: "Excellent service!" },
        { authorId: "", rating: 1, comment: "There were a lot of delays on his part. Frankly I wouldn't want this guy delivering for me again" },
    ],
    messages: messagesList,
    createdAt: new Date("2023-01-15"),
    lastUpdated: new Date("2025-03-01")
};

export const agent2: Agent = {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "hashed_password_456",
    id: "agent_002",
    fName: "Jane",
    lName: "Smith",
    gender: "female",
    profilePhoto: "https://example.com/photos/jane.jpg",
    dob: new Date("1990-03-22"),
    phoneNumber: "+1-555-0456",
    face: {},
    location: "Los Angeles, CA",
    about: "Friendly and reliable agent",
    isPhoneNumberVerified: true,
    isPersonalIdVerified: false,
    isEmailVerified: true,
    orders: [],
    tier: {
        name: "Silver",
        description: "Mid-tier agent with good benefits"
    },
    reviews: [
        {
            authorId: "cust_002",
            rating: 5,
            comment: "Excellent experience!"
        }
    ],
    createdAt: new Date("2023-06-01"),
    lastUpdated: new Date("2025-02-15")
};

// Customers
export const customer1: Customer = {
    username: "mary_jones",
    email: "mary.jones@example.com",
    password: "hashed_password_789",
    id: "cust_001",
    fName: "Mary",
    lName: "Jones",
    gender: "female",
    profilePhoto: "https://example.com/photos/mary.jpg",
    location: "Chicago, IL",
    isEmailVerified: true,
    messages: [
        {
            id: "msg_001",
            senderId: "cust_001",
            recipientId: "agent_001",
            content: "Hi, I have a question about a product",
            read: true, timestamp: new Date("2025-03-10")
        }
    ]
};

export const customer2: Customer = {
    username: "peter_parker",
    email: "peter.parker@example.com",
    password: "hashed_password_101",
    id: "cust_002",
    fName: "Peter",
    lName: "Parker",
    gender: "male",
    location: "Boston, MA",
    isEmailVerified: false
};

export const customer3: Customer = {
    username: "sarah_connor",
    email: "sarah.connor@example.com",
    password: "hashed_password_112",
    id: "cust_003",
    fName: "Sarah",
    lName: "Connor",
    gender: "female",
    isEmailVerified: true
};

// BaseProducts List 1
export const productsList1: BaseProduct[] = [
    {
        id: "prod_001",
        name: "Wireless Headphones",
        orderId: "", category: "Electronics",
        images: ["https://example.com/images/headphones1.jpg"],
        videos: ["https://example.com/videos/headphones1.mp4"],
        description: "High-quality wireless headphones with noise cancellation",
        condition: {
            name: "Like New",
            inspected: true,
            description: "Barely used, perfect condition"
        },
        location: "New York, NY",
        price: 129.99,
        reviews: [
            {
                authorId: "cust_001",
                rating: 5,
                comment: "Amazing sound quality!"
            }
        ],
        createdAt: new Date("2024-01-10"),
        lastUpdated: new Date("2025-03-15")
    },
    {
        id: "prod_002",
        name: "Smart Watch",
        orderId: "", category: "Electronics",
        images: ["https://example.com/images/watch1.jpg"],
        description: "Fitness tracking smart watch",
        price: 89.99,
        reviews: [],
        createdAt: new Date("2024-02-01"),
        lastUpdated: new Date("2025-03-01")
    }
];

// BaseProducts List 2
export const productsList2: BaseProduct[] = [
    {
        id: "prod_003",
        name: "Leather Jacket",
        orderId: "", category: "Clothing",
        images: ["https://lh3.googleusercontent.com/d/1UoxsntiPPeuMWxFVMIWVg8WBqDJNI3XW"],
        description: "Genuine leather jacket, black",
        condition: {
            name: "Good",
            inspected: true,
            description: "Minor wear on sleeves"
        },
        location: "Los Angeles, CA",
        price: 199.99,
        reviews: [
            {
                authorId: "cust_002",
                rating: 4
            }
        ],
        createdAt: new Date("2024-03-15"),
        lastUpdated: new Date("2025-02-20")
    }
];

// BaseProductLites List
export const productLitesList: BaseProductLite[] = [
    {
        name: "USB Cable",
        image: "https://example.com/images/cable1.jpg",
        condition: {
            name: "New",
            inspected: false,
            description: "Brand new in package"
        },
        price: 9.99
    },
    {
        name: "Mouse Pad",
        image: "https://example.com/images/mousepad1.jpg",
        price: 5.99
    },
    {
        name: "Phone Case",
        image: "https://example.com/images/case1.jpg",
        condition: {
            name: "Used",
            inspected: true,
            description: "Slight scratches"
        },
        price: 12.99
    }
];

// Sale Orders
export const saleOrder1: SaleOrder = {
    name: "Headphones Sale",
    products: [
        {
            id: "prod_001",
            name: "Wireless Headphones",
            orderId: "", category: "Electronics",
            images: ["https://lh3.googleusercontent.com/d/13t9ULoUT1fNJ0-SGSBSBw7vLgKDgm5Ix"],
            videos: ["https://example.com/videos/headphones1.mp4"],
            description: "High-quality wireless headphones with noise cancellation",
            condition: {
                name: "Like New",
                inspected: true,
                description: "Barely used, perfect condition"
            },
            location: "New York, NY",
            price: 129.99,
            reviews: [
                {
                    authorId: "cust_001",
                    rating: 5,
                    comment: "Amazing sound quality!"
                }
            ],
            createdAt: new Date("2024-01-10"),
            lastUpdated: new Date("2025-03-15")
        }
    ],
    description: "Selling premium wireless headphones",
    creatorId: "agent_001",
    isFulfilled: true,
    agentsAssignedIds: ["agent_001"],
    createdAt: new Date("2025-03-10"),
    lastUpdated: new Date("2025-03-15"),
    startPrice: 149.99,
    finalPrice: 129.99
};

export const saleOrder2: SaleOrder = {
    name: "Jacket Clearance",
    products: [
        {
            id: "prod_003",
            name: "Leather Jacket",
            orderId: "", category: "Clothing",
            images: ["https://example.com/images/jacket1.jpg"],
            description: "Genuine leather jacket, black",
            condition: {
                name: "Good",
                inspected: true,
                description: "Minor wear on sleeves"
            },
            location: "Los Angeles, CA",
            price: 199.99,
            reviews: [
                {
                    authorId: "cust_002",
                    rating: 4
                }
            ],
            createdAt: new Date("2024-03-15"),
            lastUpdated: new Date("2025-02-20")
        }
    ],
    description: "Clearance sale for leather jacket",
    creatorId: "agent_002",
    isFulfilled: false,
    agentsAssignedIds: ["agent_002"],
    createdAt: new Date("2025-02-25"),
    lastUpdated: new Date("2025-03-01"),
    startPrice: 249.99,
    finalPrice: 199.99
};

export const saleOrder3: SaleOrder = {
    name: "Smart Watch Deal",
    products: [
        {
            id: "prod_002",
            name: "Smart Watch",
            orderId: "", category: "Electronics",
            images: ["https://example.com/images/watch1.jpg"],
            description: "Fitness tracking smart watch",
            price: 89.99,
            reviews: [],
            createdAt: new Date("2024-02-01"),
            lastUpdated: new Date("2025-03-01")
        }
    ],
    description: "Special deal on smart watch",
    creatorId: "agent_001",
    isFulfilled: true,
    agentsAssignedIds: ["agent_001", "agent_002"],
    createdAt: new Date("2025-03-05"),
    lastUpdated: new Date("2025-03-18"),
    finalPrice: 89.99
};

// Purchase Orders
export const purchaseOrder1: PurchaseOrder = {
    name: "USB Cable Order",
    products: [
        {
            name: "USB Cable",
            image: "https://example.com/images/cable1.jpg",
            condition: {
                name: "New",
                inspected: false,
                description: "Brand new in package"
            },
            price: 9.99
        }
    ],
    description: "Ordering new USB cables for inventory",
    creatorId: "cust_001",
    isFulfilled: false,
    agentsAssignedIds: ["agent_001"],
    createdAt: new Date("2025-03-12"),
    lastUpdated: new Date("2025-03-15"),
    reference: {
        url: "https://supplier.com/usb-cable",
        description: "USB-C charging cable, 3ft"
    },
    isProductAvailable: true
};

export const purchaseOrder2: PurchaseOrder = {
    name: "Phone Case Request",
    products: null,
    description: "Looking for specific phone case",
    creatorId: "cust_002",
    isFulfilled: false,
    agentsAssignedIds: ["agent_002"],
    createdAt: new Date("2025-03-16"),
    lastUpdated: new Date("2025-03-17"),
    reference: {
        url: "https://supplier.com/phone-case",
        description: "iPhone 14 Pro case, clear"
    },
    isProductAvailable: false
};

// Combined list
export const ordersList = [saleOrder1, saleOrder2, saleOrder3, purchaseOrder1, purchaseOrder2];