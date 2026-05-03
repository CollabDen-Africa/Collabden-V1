import { localApi } from "@/lib/axios";
import type {
  Project,
  CreateProjectPayload,
  InviteCollaboratorPayload,
  ApiResponse,
} from "@/types/api.types";

const projectService = {
  /**
   * List all active projects for the authenticated user.
   */
  getAll: async (): Promise<Project[]> => {
    const response = await localApi.get<ApiResponse<Project[]>>("/api/proxy/projects");
    const raw = response.data;
    if (Array.isArray(raw)) return raw;
    if (raw.data && Array.isArray(raw.data)) return raw.data;
    return [];
  },

  /**
   * Get project workspace details by ID.
   */
  getById: async (id: string): Promise<Project> => {
    const response = await localApi.get<ApiResponse<Project>>(`/api/proxy/projects/${id}`);
    return response.data.data || response.data as unknown as Project;
  },

  /**
   * Create a new project.
   */
  create: async (data: CreateProjectPayload): Promise<Project> => {
    const response = await localApi.post<ApiResponse<Project>>("/api/proxy/projects", data);
    return response.data.data || response.data as unknown as Project;
  },

  /**
   * Update project details.
   */
  update: async (id: string, data: Partial<CreateProjectPayload>): Promise<Project> => {
    const response = await localApi.patch<ApiResponse<Project>>(`/api/proxy/projects/${id}`, data);
    return response.data.data || response.data as unknown as Project;
  },

  /**
   * Delete a project.
   */
  deleteProject: async (id: string): Promise<void> => {
    await localApi.delete(`/api/proxy/projects/${id}`);
  },

  /**
   * Invite a collaborator to a project.
   */
  invite: async (projectId: string, data: InviteCollaboratorPayload): Promise<void> => {
    await localApi.post(`/api/proxy/projects/${projectId}/invite`, data);
  },

  /**
   * Remove a collaborator from a project.
   */
  removeCollaborator: async (projectId: string, collaboratorId: string): Promise<void> => {
    await localApi.delete(`/api/proxy/projects/${projectId}/collaborators/${collaboratorId}`);
  },
};

export default projectService;
