import categories from '../../mocks/categories.json' with {type: 'json'}
import { randomUUID } from 'node:crypto'

export class CategoryModel {
  static async getAll() {
    return await categories
  }

  static async getById({ id }) {
    const category = categories.find(category => category.id == id)
    
    return category
  }

  static async create({input}) {
    const newCategory = {
      id: randomUUID(),
      ... input,
      createDatetime: new Date().toISOString()
    }
    categories.push(newCategory)

    return newCategory
  }

  static async update({id, input}) {

    const categoryIndex = categories.findIndex(category => category.id == id)

    if (categoryIndex === -1) return false
  
    const updatedCategory = {
      ...categories[categoryIndex],
      ...input,
      updateDatetime: new Date().toISOString()
    }
  
    categories[categoryIndex] = updatedCategory
  }

  static async delete({id}) {
    const categoryIndex = categories.findIndex(category => category.id == id)

    if(categoryIndex === -1) return false

    categories.splice(categoryIndex, 1)

    return true
  }
}
