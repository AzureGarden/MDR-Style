import ResponseFacility from "./ResponseFacility";

class ControlCenter {
    constructor() {
        this.eventHandlers = {
            "MouseMove": ResponseFacility.handleMouseMove,
            "Click": ResponseFacility.handleClick
        };
    }

    handleEvent = (event) => {
        const { type, ...rest } = event.detail;

        const handler = this.eventHandlers[type];
        if (handler) {
            try {
                handler(rest);
            } catch (error) {
                console.error("Error in event handler!", error);
            }
        } else {
            console.log("No handler found for event type:", type);
        }
    }
}

export default ControlCenter;