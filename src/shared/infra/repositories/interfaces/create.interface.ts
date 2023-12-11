export interface Create<E = unknown, D = unknown> {
  create(data: D, actionDoneBy?: string): Promise<E>;
}
