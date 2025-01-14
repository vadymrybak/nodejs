import { Producer } from "node-rdkafka";

const producer = new Producer({
    "metadata.broker.list": "localhost:9092", // Replace with your Kafka broker
});

producer.connect();

producer.on("ready", () => {
    try {
        producer.produce(
            "test-topic", // Change to your topic
            0,
            Buffer.from("Hello Kafka1!"),
            null,
            Date.now()
        );
        console.log("Message sent");
    } catch (err) {
        console.error("Error sending message:", err);
    }
});
