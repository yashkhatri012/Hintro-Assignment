class ApiResponse {
  constructor(traceId, data) {
    this.traceId = traceId;
    this.success = true;
    this.data = data;
  }
}

export default ApiResponse;