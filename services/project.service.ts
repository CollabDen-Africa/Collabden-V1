import axios from "axios";
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
    const response = await axios.get<ApiResponse<Project[]>>("/api/proxy/projects");
    const raw = response.data;
    if (Array.isArray(raw)) return raw;
    if (raw.data && Array.isArray(raw.data)) return raw.data;
    return [];
  },

  /**
   * Get project workspace details by ID.
   */
  getById: async (id: string): Promise<Project> => {
    const response = await axios.get<ApiResponse<Project>>(`/api/proxy/projects/${id}`);
    return response.data.data || response.data as unknown as Project;
  },

  /**
   * Create a new project.
   */
  create: async (data: CreateProjectPayload): Promise<Project> => {
    const response = await axios.post<ApiResponse<Project>>("/api/proxy/projects", data);
    return response.data.data || response.data as unknown as Project;
  },

  /**
   * Invite a collaborator to a project.
   */
  invite: async (projectId: string, data: InviteCollaboratorPayload): Promise<void> => {
    await axios.post(`/api/proxy/projects/${projectId}/invite`, data);
  },
};

export default projectService;
