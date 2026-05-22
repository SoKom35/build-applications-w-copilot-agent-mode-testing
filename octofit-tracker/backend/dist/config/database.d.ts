/**
 * Connect to MongoDB using mongoose
 */
export declare function connectToDatabase(): Promise<void>;
/**
 * Disconnect from MongoDB
 */
export declare function disconnectFromDatabase(): Promise<void>;
declare const _default: {
    connectToDatabase: typeof connectToDatabase;
    disconnectFromDatabase: typeof disconnectFromDatabase;
};
export default _default;
//# sourceMappingURL=database.d.ts.map