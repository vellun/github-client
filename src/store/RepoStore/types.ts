export type GetOrganizationReposListParams = {
  organizationName: string;
  perPage?: number;
  page?: number;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}