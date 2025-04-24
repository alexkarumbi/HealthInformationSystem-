class HealthProgram {
    constructor(id, name, description, startDate = new Date(), endDate = null) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }