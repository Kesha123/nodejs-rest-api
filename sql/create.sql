-- ----------------------------------------------------------------------
--
--          Create Tables
--
-- ----------------------------------------------------------------------

CREATE TABLE dept
(
    deptno                INTEGER       NOT NULL UNIQUE
    , dname               VARCHAR(14)
    , loc                 VARCHAR(13)

    , CONSTRAINT dept_primary_key
      PRIMARY KEY (deptno)
);

CREATE UNIQUE INDEX dept_deptno_pk
    ON dept (deptno);

DROP TABLE IF EXISTS EMP;
DROP TABLE IF EXISTS emp;

CREATE TABLE emp
(
    empno                 INTEGER       NOT NULL UNIQUE
    , ename               VARCHAR(10)   NOT NULL
    , job                 VARCHAR(9)    NOT NULL

    , mgr                 INTEGER
    , hiredate            DATE          NOT NULL
    , sal                 NUMERIC(7,2)  NOT NULL
    , comm                NUMERIC(7,2)
    , deptno              INTEGER       NOT NULL

    , CONSTRAINT emp_empno_pk
      PRIMARY KEY (empno)

    , CONSTRAINT emp_mgr_fk
      FOREIGN KEY (mgr)
      REFERENCES emp (empno)

    , CONSTRAINT emp_deptno_fk
      FOREIGN KEY (deptno)
      REFERENCES dept (deptno)
);

CREATE UNIQUE INDEX emp_empno_uindex
    ON emp (empno);
