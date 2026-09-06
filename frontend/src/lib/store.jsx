import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SEED_CHALLENGES } from "./seed";
import { runAIAnalysis, matchUniversities, matchIndustries, LIFECYCLE } from "./engine";

const KEY = "jmib_challenges_v5";
const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [challenges, setChallenges] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore */
    }
    return SEED_CHALLENGES;
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(challenges));
  }, [challenges]);

  const [solvers, setSolvers] = useState(() => {
    try {
      const raw = localStorage.getItem("jmib_solvers_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore */
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("jmib_solvers_v1", JSON.stringify(solvers));
  }, [solvers]);

  const addSolver = useCallback((data) => {
    const s = { id: `solver-${Date.now()}`, ...data, createdAt: new Date().toISOString() };
    setSolvers((prev) => [s, ...prev]);
    return s;
  }, []);

  const [role, setRoleState] = useState(() => {
    try {
      return localStorage.getItem("jmib_role") || "citizen";
    } catch (e) {
      return "citizen";
    }
  });
  const setRole = useCallback((r) => {
    setRoleState(r);
    try {
      localStorage.setItem("jmib_role", r);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const addChallenge = useCallback((data) => {
    const ai = runAIAnalysis(data);
    const universities = matchUniversities(data);
    const industries = matchIndustries(data);
    const c = {
      id: `jmib-${Date.now()}`,
      ...data,
      status: "Under Ministry Review",
      createdAt: new Date().toISOString(),
      ai,
      universities,
      industries,
      stageIndex: 0,
    };
    setChallenges((prev) => [c, ...prev]);
    return c;
  }, []);

  const updateChallenge = useCallback((id, patch) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...(typeof patch === "function" ? patch(c) : patch) } : c))
    );
  }, []);

  const advanceStage = useCallback((id) => {
    let stageName = null;
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = Math.min(c.stageIndex + 1, LIFECYCLE.length - 1);
        stageName = LIFECYCLE[next];
        return { ...c, stageIndex: next, status: stageName };
      })
    );
    return stageName;
  }, []);

  const addMessage = useCallback((id, msg) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, thread: [...(c.thread || []), { id: `m-${Date.now()}`, at: new Date().toISOString(), ...msg }] }
          : c
      )
    );
  }, []);

  const resetDemo = useCallback(() => setChallenges(SEED_CHALLENGES), []);

  return (
    <Ctx.Provider value={{ challenges, addChallenge, updateChallenge, advanceStage, resetDemo, solvers, addSolver, role, setRole, addMessage }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
export const useChallenge = (id) => {
  const { challenges } = useStore();
  return challenges.find((c) => c.id === id);
};
