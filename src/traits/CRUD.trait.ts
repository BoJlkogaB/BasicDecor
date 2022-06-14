export async function create(dto) {
  return await this.repository.create(dto);
}

export async function findAll() {
  return await this.repository.findAll();
}

export async function findByPk(id, all = true) {
  return await this.repository.findByPk(
    id,
    all ? { include: { all: true } } : {},
  );
}

export async function update(dto) {
  return this.repository.update(dto, { where: { id: dto.id } });
}

export async function destroy(id) {
  return await this.repository.destroy({ where: { id: id } });
}
