export function createUserAction(action, type, timestamp) {
    return new UserAction(action, type, timestamp);
}

class UserAction {
    constructor(action, type, timestamp) {
        this.action = action;
        this.type = type;
        this.timestamp = timestamp;
    }
}