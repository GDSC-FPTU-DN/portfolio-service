const FirebaseSchema = require("../services/firebase.service");
const StorageSchema = require("../services/storage.service");
const { Skill } = require("./skill.model");
const { Project } = require("./project.model");

class Member {
  constructor(
    userName,
    firstName,
    lastName,
    roles,
    imageUrl,
    description,
    gender,
    birthday,
    zodiac,
    phone,
    email,
    facebook,
    instagram,
    linkedin,
    github,
    quote,
    skills,
    projects,
  ) {
    (this.userName = userName),
      (this.firstName = firstName ?? ""),
      (this.lastName = lastName ?? ""),
      (this.roles = roles ?? []),
      (this.imageUrl = imageUrl ?? ""),
      (this.description = description ?? ""),
      (this.gender = gender ?? ""),
      (this.birthday = birthday ?? ""),
      (this.zodiac = zodiac ?? ""),
      (this.phone = phone ?? null),
      (this.email = email ?? null),
      (this.facebook = facebook ?? null),
      (this.instagram = instagram ?? null),
      (this.linkedin = linkedin ?? null),
      (this.github = github ?? null),
      (this.quote = quote ?? ""),
      (this.skills = skills ?? []),
      (this.projects = projects ?? []);
  }

  static fromObject(obj) {
    return new Member(
      obj.userName,
      obj.firstName,
      obj.lastName,
      obj.roles,
      obj.imageUrl,
      obj.description,
      obj.gender,
      obj.birthday,
      obj.zodiac,
      obj.phone,
      obj.email,
      obj.facebook,
      obj.instagram,
      obj.linkedin,
      obj.github,
      obj.quote,
      obj.skills?.map((skill) => Skill.fromObject(skill)),
      obj.projects?.map((project) => Project.fromObject(project)),
    );
  }

  toObject() {
    return {
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      roles: this.roles,
      imageUrl: this.imageUrl,
      description: this.description,
      gender: this.gender,
      birthday: this.birthday,
      zodiac: this.zodiac,
      phone: this.phone,
      email: this.email,
      facebook: this.facebook,
      instagram: this.instagram,
      linkedin: this.linkedin,
      github: this.github,
      quote: this.quote,
      skills: this.skills?.map((skill) => skill.toObject()),
      projects: this.projects?.map((project) => project.toObject()),
    };
  }
}

const MemberSchema = new FirebaseSchema("Member", Member);
const MemberStorage = new StorageSchema("Member");

module.exports = { Member, MemberSchema, MemberStorage };
