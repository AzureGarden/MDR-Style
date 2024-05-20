import DispatchHub from "./DispatchHub";
import ControlCenter from "./ControlCenter";

const initializationGateway = {
    bootstrap: function() {
        console.log('Bootstraping the gateway...');
        this.startup();
    },
    startup: function() {
        console.log('Starting the gateway...');

        const controlCenter = new ControlCenter();
        document.addEventListener("DOMEvent", controlCenter.handleEvent);
        
        const dispatchHub = new DispatchHub();
        dispatchHub.observe();
        dispatchHub.createObserver("test-button", "DOMEvent", "Click", "Hello World!");
    }
};

initializationGateway.bootstrap();