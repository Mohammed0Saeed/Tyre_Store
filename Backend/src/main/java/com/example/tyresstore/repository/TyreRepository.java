package com.example.tyresstore.repository;

import com.example.tyresstore.model.Tyre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TyreRepository extends JpaRepository<Tyre, Long> {
}
