import React from 'react';
import { calculateClassStats } from '../utils/gradeCalculations';

export default function ClassCard({
  course,
  onUpdateCourse,
  onDeleteCourse,
  onAddAssignment,
  onUpdateAssignment,
  onDeleteAssignment,
}) {
  const { average, totalWeight, letterGrade } = calculateClassStats(course.assignments);

  const getWeightBadgeClass = () => {
    if (totalWeight > 100) return 'bg-danger-subtle text-danger border border-danger-subtle';
    if (totalWeight === 100) return 'bg-success-subtle text-success border border-success-subtle';
    return 'bg-warning-subtle text-dark border border-warning-subtle';
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white py-3 border-bottom">
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <label className="form-label small text-muted mb-1">Class Name</label>
            <input
              type="text"
              className="form-control fw-semibold"
              placeholder="e.g., Corporate Finance"
              value={course.name}
              onChange={(e) => onUpdateCourse(course.id, 'name', e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label small text-muted mb-1">Credits</label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              className="form-control tabular-nums"
              placeholder="3"
              value={course.credits}
              onChange={(e) => onUpdateCourse(course.id, 'credits', e.target.value)}
            />
          </div>

          <div className="col-6 col-md-5 d-flex flex-column align-items-md-end justify-content-end">
            <div className="d-flex align-items-center gap-2 mt-md-3">
              <div className="text-end me-2">
                <div className="small text-muted">Class Average</div>
                <div className="fs-5 fw-bold tabular-nums text-primary">
                  {average !== null ? `${average.toFixed(2)}%` : '—'}{' '}
                  {average !== null && (
                    <span className="badge bg-primary ms-1">{letterGrade}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                title="Remove Class"
                onClick={() => onDeleteCourse(course.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="mb-0 text-secondary fw-semibold">
            <i className="bi bi-list-check me-2"></i>Assignments
          </h6>
          <span className={`badge rounded-pill px-3 py-2 ${getWeightBadgeClass()}`}>
            Total Weight: {totalWeight.toFixed(0)}% / 100%
            {totalWeight > 100 && ' (Exceeds 100%)'}
          </span>
        </div>

        {course.assignments.length === 0 ? (
          <div className="text-center py-4 bg-light rounded border border-dashed mb-3">
            <p className="text-muted mb-2 small">No assignments added to this class yet.</p>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onAddAssignment(course.id)}
            >
              <i className="bi bi-plus-lg me-1"></i>Add First Assignment
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-3">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '44%' }}>Assignment Name</th>
                  <th style={{ width: '20%' }}>Weight (%)</th>
                  <th style={{ width: '20%' }}>Grade (%)</th>
                  <th style={{ width: '10%' }} className="text-end">Points</th>
                  <th style={{ width: '6%' }} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {course.assignments.map((assignment) => {
                  const w = parseFloat(assignment.weight);
                  const g = parseFloat(assignment.grade);
                  const weightedContribution =
                    !Number.isNaN(w) && !Number.isNaN(g)
                      ? ((w * g) / 100).toFixed(2)
                      : '—';

                  return (
                    <tr key={assignment.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="e.g., Midterm Exam"
                          value={assignment.name}
                          onChange={(e) =>
                            onUpdateAssignment(
                              course.id,
                              assignment.id,
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            className="form-control tabular-nums"
                            placeholder="20"
                            value={assignment.weight}
                            onChange={(e) =>
                              onUpdateAssignment(
                                course.id,
                                assignment.id,
                                'weight',
                                e.target.value
                              )
                            }
                          />
                          <span className="input-group-text">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <input
                            type="number"
                            min="0"
                            max="200"
                            step="0.1"
                            className="form-control tabular-nums"
                            placeholder="92"
                            value={assignment.grade}
                            onChange={(e) =>
                              onUpdateAssignment(
                                course.id,
                                assignment.id,
                                'grade',
                                e.target.value
                              )
                            }
                          />
                          <span className="input-group-text">%</span>
                        </div>
                      </td>
                      <td className="text-end text-muted small tabular-nums">
                        {weightedContribution !== '—' ? `${weightedContribution}%` : '—'}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0"
                          title="Delete Assignment"
                          onClick={() => onDeleteAssignment(course.id, assignment.id)}
                        >
                          <i className="bi bi-x-circle fs-6"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {course.assignments.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onAddAssignment(course.id)}
          >
            <i className="bi bi-plus-lg me-1"></i>Add Assignment
          </button>
        )}
      </div>
    </div>
  );
}