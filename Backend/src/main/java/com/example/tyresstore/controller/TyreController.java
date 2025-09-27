package com.example.tyresstore.controller;

import com.example.tyresstore.model.Tyre;
import com.example.tyresstore.service.TyreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tyres")
public class TyreController {

    private final TyreService tyreService;

    @Autowired
    public TyreController(TyreService tyreService) {
        this.tyreService = tyreService;
    }

    // Both USER and ADMIN can access
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<Tyre> findAll() {
        return tyreService.getTyres();
    }

    // Both USER and ADMIN can access
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public Optional<Tyre> findOne(@PathVariable Long id) {
        return tyreService.getTyreById(id);
    }

    // Only ADMIN can access
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public void save(@RequestBody Tyre tyre) {
        tyreService.addTyre(tyre);
    }

    // Only ADMIN can access
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Tyre tyre) {
        tyreService.updateTyre(id, tyre);
    }

    // Only ADMIN can access
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tyreService.deleteTyre(id);
    }
}
