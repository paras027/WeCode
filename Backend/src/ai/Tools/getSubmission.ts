import Submission from "../../models/submission.model";
import ApiError from "../../utils/ApiError";

interface GetSubmissionArgs {
  submissionId: string;
}

export async function getSubmission({
  submissionId,
}: GetSubmissionArgs) {
  const submission = await Submission.findById(submissionId)
    .populate({
      path: "problem",
      select: "_id",
    })
    .select(
      "code language verdict runtime memory problemId"
    )
    .lean();

  if (!submission) {
    throw new ApiError(404, "Submission not found");
  }

  return submission;
}