class Skill {
  constructor(name, percent, description) {
    this.name = name ?? "";
    // Format percent. Must be a number between 0 and 100
    if (parseInt(percent)) {
      percent = parseInt(percent);
    }
    if (percent < 0 || percent === "0") {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }
    this.percent = percent ?? 0;
    this.description = description ?? "";
  }

  static fromObject(obj) {
    return new Skill(obj.name, obj.percent, obj.description);
  }

  toObject() {
    return {
      name: this.name,
      percent: this.percent,
      description: this.description,
    };
  }
}

module.exports = { Skill };
