export default [
    {
        "id": 0,
        "skill": "General_Conversation",
        "intent": "Greetings",
        "trainingLabels": ["hi", "hello", "hey", "hi there"],
        "msg": ["Hi There, How can i help you today", "You can choose from the options bellow"],
        "options": [
            ["Tell me about the product", "Tell me about the product"],
            ["Tell me about the pricing", "Tell me about the pricing"],
            ["Something else", "Capture_Details"]
        ]
    },
    {
        "id": 1,
        "skill": "sales",
        "intent": "Tell me about the product",
        "trainingLabels": ["Tell me about yourself", "who are you", "are you human"],
        "msg": [
            "Here is an amazing video about our product",
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/2A6gh62uDws" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            "Share your email and our team will get back to you with more details"
        ],
        "options": [
            ["Share email addres", "Capture_Email"],
            ["No thanks", "Close_Chat"]
        ]
    },
    {
        "id": 2,
        "skill": "sales",
        "intent": "Tell me about the pricing",
        "trainingLabels": ["Tell me about the pricing", "pricing details", "how much does it costs"],
        "msg": [
            "Please click this link to visit our pricing page",
            "or share your email and our team will contact you"
        ],
        "options": [
            ["Share email addres", "Capture_Email"],
            ["No thanks", "Close_Chat"]
        ]
    },
    {
        "id": 3,
        "skill": "sales",
        "intent": "Capture_Details",
        "trainingLabels": [],
        "msg": [
            "Okay, I can raise a service ticket on your behalf and the team will get back to you"
        ],
        "options": [
            ["Sure!", "Offline_Form"],
            ["No thanks", "Close_Chat"]
        ]
    },
    {
        "id": 4,
        "skill": "General_Conversation",
        "intent": "Ticket Raised",
        "trainingLabels": [],
        "msg": [
            "A ticket has been raised our team will contact you ASAP",
            "I'll be here if you need any firther assistance"
        ],
        "options": [
            ["Need assistance", "Greetings"]
        ]
    },
    {
        "id": 5,
        "skill": "General_Conversation",
        "intent": "Eamil_Captured",
        "trainingLabels": [],
        "msg": [
            "Your eamil has been saved, our team will contact you ASAP",
            "I'll be here if you need any firther assistance"
        ],
        "options": [
            ["Need assistance", "Greetings"]
        ]
    },
    {
        "id": 6,
        "skill": "General_Conversation",
        "intent": "Close_Chat",
        "trainingLabels": [],
        "msg": ["Okay, I'll be here if you need me."],
        "options": [
            ["Need assistance", "Greetings"]
        ]
    },
]