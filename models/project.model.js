const FirebaseSchema = require("../services/firebase.service");

class Project {
  constructor(
    name,
    description,
    startDate,
    endDate,
    roles,
    technologies,
    images,
    syncId,
  ) {
    this.name = name ?? "";
    this.description = description ?? "";
    this.startDate = startDate ?? "";
    this.endDate = endDate ?? "";
    this.roles = roles ?? [];
    this.technologies = technologies ?? [];
    this.images = images ?? [];
    this.syncId = syncId ?? null;
  }

  static fromObject(obj) {
    return new Project(
      obj.name,
      obj.description,
      obj.startDate,
      obj.endDate,
      obj.roles,
      obj.technologies,
      obj.images,
      obj.syncId,
    );
  }

  toObject() {
    return {
      name: this.name,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      roles: this.roles,
      technologies: this.technologies,
      images: this.images,
      syncId: this.syncId,
    };
  }
}

const ProjectSchema = new FirebaseSchema("Project", Project);

module.exports = { Project, ProjectSchema };
