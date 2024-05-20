class DispatchHub {
    constructor() {
        this.observers = [];
    }

    observe() {
        document.onmousemove = (event) => {
            this.dispatchEvent("DOMEvent", "MouseMove", {
                x: event.clientX,
                y: event.clientY
            });
        };
    }

    analyze(category, eventType, event) {
        const eventData = event.detail;

        const processedData = {
            type: eventData.type,
            ...eventData.data,
            analyzed: true,
            timestamp: Date.now()
        };

        this.dispatchEvent(category, eventType, processedData);
    }

    dispatchEvent(category, eventType, eventData) {
        document.dispatchEvent(new CustomEvent(category, {
            detail: {
                type: eventType,
                data: eventData
            }
        }));
    }

    createObserver(elementId, category, eventType, message) {
        this.observers.push({ elementId, category, eventType, handler: { type: eventType, message } });

        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener("click", (nativeEvent) => {
                const event = new CustomEvent(category, {
                    detail: {
                        type: eventType,
                        data: {
                            message: message,
                            nativeEventData: nativeEvent
                        }
                    }
                });

                this.analyze(category, eventType, event);
            });
        } else {
            console.warn(`Element with id ${elementId} not found`);
        }
    }

    deleteObserver(elementId, eventType) {
        this.observers = this.observers.filter((observer) => !(observer.elementId === elementId && observer.eventType === eventType));

        const element = document.getElementById(elementId);
        if (element) {
            element.removeEventListener(eventType, this.handleEvent);
        }
    }
}

export default DispatchHub;
