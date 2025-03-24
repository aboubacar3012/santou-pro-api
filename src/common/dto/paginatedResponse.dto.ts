/**
 * Classe qui contient les informations de pagination.
 *
 * @property totalItems - Nombre total d'éléments disponibles
 * @property page - Page actuelle (commence à 1)
 * @property limit - Nombre d'éléments par page
 * @property totalPages - Nombre total de pages
 */
export class PaginationInfo {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Classe générique pour représenter une réponse paginée.
 *
 * @template T - Type des éléments de la collection
 * @property [key: string] - Clé dynamique pour stocker la collection d'éléments (peut être 'items', 'users', 'clients', etc.)
 * @property pagination - Informations de pagination
 */
export class PaginatedResponseDto<T> {
  [key: string]: T[] | PaginationInfo;
  pagination: PaginationInfo;

  /**
   * Crée une instance de PaginatedResponseDto.
   *
   * @param items - Collection d'éléments à paginer
   * @param pagination - Informations de pagination
   * @param itemsName - Nom à utiliser pour la collection (par défaut: 'items')
   *
   * @example
   * Création d'une réponse paginée avec des utilisateurs
   * const usersPaginated = new PaginatedResponseDto<User>(users, paginationInfo, 'users');
   * Résultat: { users: [...], pagination: {...} }
   */
  constructor(
    items: T[],
    pagination: PaginationInfo,
    itemsName: string = 'items',
  ) {
    this[itemsName] = items;
    this.pagination = pagination;
  }
}
