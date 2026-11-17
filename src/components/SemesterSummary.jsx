import React from 'react';

export default function SemesterSummary({ stats, classCount }) {
  const {
    overallPercentage,
    semesterGpa,
    totalEnrolledCredits,
    overallLetter,
  } = stats;

  return (
    <div className="row g-3 mb-4">
      <div className="col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-semibold">
                Semester Percentage
              </span>
              <i className="bi bi-percent text-primary fs-5"></i>
            </div>
            <div className="d-flex align-items-baseline gap-2">
              <h2 className="mb-0 fw-bold tabular-nums text-dark">
                {overallPercentage !== null ? `${overallPercentage.toFixed(2)}%` : '—'}
              </h2>
              {overallPercentage !== null && (
                <span className="badge bg-primary-subtle text-primary fw-semibold">
                  {overallLetter}
                </span>
              )}
            </div>
            <small className="text-muted">Credit-weighted average</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-semibold">
                Semester GPA
              </span>
              <i className="bi bi-mortarboard-fill text-success fs-5"></i>
            </div>
            <h2 className="mb-0 fw-bold tabular-nums text-dark">
              {semesterGpa !== null ? semesterGpa.toFixed(2) : '—'}
            </h2>
            <small className="text-muted">4.00 grading scale</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-semibold">
                Total Credits
              </span>
              <i className="bi bi-journal-bookmark-fill text-info fs-5"></i>
            </div>
            <h2 className="mb-0 fw-bold tabular-nums text-dark">
              {totalEnrolledCredits}
            </h2>
            <small className="text-muted">Enrolled credit hours</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-semibold">
                Active Classes
              </span>
              <i className="bi bi-collection-fill text-secondary fs-5"></i>
            </div>
            <h2 className="mb-0 fw-bold tabular-nums text-dark">
              {classCount}
            </h2>
            <small className="text-muted">Courses this semester</small>
          </div>
        </div>
      </div>
    </div>
  );
}