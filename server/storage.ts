import { users, apiRequests, type User, type InsertUser, type ApiRequest, type InsertApiRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logApiRequest(request: InsertApiRequest): Promise<ApiRequest>;
  getApiStats(): Promise<{
    totalRequests: number;
    successfulRequests: number;
    errorRequests: number;
    averageResponseTime: number;
    uptime: number;
  }>;
  getApiUsage(): Promise<ApiRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private apiRequests: Map<number, ApiRequest>;
  private currentUserId: number;
  private currentRequestId: number;
  private startTime: number;

  constructor() {
    this.users = new Map();
    this.apiRequests = new Map();
    this.currentUserId = 1;
    this.currentRequestId = 1;
    this.startTime = Date.now();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async logApiRequest(insertRequest: InsertApiRequest): Promise<ApiRequest> {
    const id = this.currentRequestId++;
    const request: ApiRequest = { 
      ...insertRequest,
      parameters: insertRequest.parameters || null,
      response: insertRequest.response || null,
      id,
      timestamp: new Date()
    };
    this.apiRequests.set(id, request);
    return request;
  }

  async getApiStats(): Promise<{
    totalRequests: number;
    successfulRequests: number;
    errorRequests: number;
    averageResponseTime: number;
    uptime: number;
  }> {
    const requests = Array.from(this.apiRequests.values());
    const totalRequests = requests.length;
    const successfulRequests = requests.filter(r => r.statusCode >= 200 && r.statusCode < 300).length;
    const errorRequests = requests.filter(r => r.statusCode >= 400).length;
    const averageResponseTime = requests.length > 0 
      ? requests.reduce((sum, r) => sum + r.responseTime, 0) / requests.length 
      : 0;
    const uptime = ((Date.now() - this.startTime) / 1000) / 3600; // in hours

    return {
      totalRequests,
      successfulRequests,
      errorRequests,
      averageResponseTime: Math.round(averageResponseTime),
      uptime: Math.round(uptime * 100) / 100
    };
  }

  async getApiUsage(): Promise<ApiRequest[]> {
    return Array.from(this.apiRequests.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 50); // Last 50 requests
  }
}

export const storage = new MemStorage();
