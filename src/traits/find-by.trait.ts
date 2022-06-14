export async function findByEmail(email: string) {
  return await this.repository.findOne({
    where: { email: email },
    include: { all: true },
  });
}

export async function findByName(name: string) {
  return await this.repository.findOne({
    where: { name: name },
    include: { all: true },
  });
}
