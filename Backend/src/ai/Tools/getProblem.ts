import Problem from "../../models/problem.model";
import ApiError from "../../utils/ApiError";

interface GetProblemArgs {
  problemId: string;
}

export async function getProblem({
  problemId,
}: GetProblemArgs) {
  const problem = await Problem.findById(problemId)
    .select(
      "title description constraints inputFormat outputFormat examples difficulty"
    )
    .lean();

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  return problem;
}  