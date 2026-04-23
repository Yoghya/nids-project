import numpy as np
from .svm_csa import CrowSearchAlgorithm

class Hybrid_CSA_PSO:
    """
    Hybrid optimization combining Crow Search Algorithm (CSA) for global exploration
    and Particle Swarm Optimization (PSO) for local exploitation.
    """
    def __init__(self, n_particles=10, csa_iter=3, pso_iter=5, bounds=[(0.1, 100), (0.01, 10), (0.01, 0.5)]):
        self.n_particles = n_particles
        self.csa_iter = csa_iter
        self.pso_iter = pso_iter
        self.bounds = np.array(bounds)
        self.dim = len(bounds)
        
    def optimize(self, fitness_func):
        # Step 1: Run CSA to explore the search space
        csa = CrowSearchAlgorithm(n_crows=self.n_particles, max_iter=self.csa_iter, bounds=self.bounds)
        
        # We need to extract the final population from CSA, but since the original CSA 
        # class just returns the best position, we'll quickly run a mock CSA pass to generate a population
        # or we can modify CSA. To keep original untouched, we will implement a quick CSA pass here.
        
        # --- Phase 1: CSA Exploration ---
        positions = np.random.uniform(self.bounds[:, 0], self.bounds[:, 1], (self.n_particles, self.dim))
        memory = np.copy(positions)
        fitness = np.array([fitness_func(p) for p in positions])
        memory_fitness = np.copy(fitness)
        
        fl = 2.0
        AP = 0.1
        
        for iter_num in range(self.csa_iter):
            for i in range(self.n_particles):
                j = np.random.randint(self.n_particles)
                r = np.random.rand()
                if r >= AP:
                    positions[i] = positions[i] + np.random.rand() * fl * (memory[j] - positions[i])
                else:
                    positions[i] = np.random.uniform(self.bounds[:, 0], self.bounds[:, 1])
                positions[i] = np.clip(positions[i], self.bounds[:, 0], self.bounds[:, 1])
                
                new_fit = fitness_func(positions[i])
                if new_fit > memory_fitness[i]:
                    memory[i] = positions[i]
                    memory_fitness[i] = new_fit
                    
        # --- Phase 2: PSO Exploitation ---
        # The final memory of CSA becomes the initial population for PSO
        pbest = np.copy(memory)
        pbest_fitness = np.copy(memory_fitness)
        gbest = pbest[np.argmax(pbest_fitness)]
        gbest_fitness = np.max(pbest_fitness)
        
        velocities = np.zeros((self.n_particles, self.dim))
        w = 0.7  # inertia weight
        c1 = 1.5 # cognitive parameter
        c2 = 1.5 # social parameter
        
        for iter_num in range(self.pso_iter):
            for i in range(self.n_particles):
                r1 = np.random.rand(self.dim)
                r2 = np.random.rand(self.dim)
                
                # Update velocity: v = w*v + c1*r1*(pbest - x) + c2*r2*(gbest - x)
                velocities[i] = w * velocities[i] + c1 * r1 * (pbest[i] - positions[i]) + c2 * r2 * (gbest - positions[i])
                
                # Update position: x = x + v
                positions[i] = positions[i] + velocities[i]
                positions[i] = np.clip(positions[i], self.bounds[:, 0], self.bounds[:, 1])
                
                new_fit = fitness_func(positions[i])
                
                if new_fit > pbest_fitness[i]:
                    pbest[i] = positions[i]
                    pbest_fitness[i] = new_fit
                    
                if new_fit > gbest_fitness:
                    gbest = positions[i]
                    gbest_fitness = new_fit
                    
        return gbest
