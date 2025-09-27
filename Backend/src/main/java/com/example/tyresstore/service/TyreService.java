package com.example.tyresstore.service;

import com.example.tyresstore.model.Season;
import com.example.tyresstore.model.Tyre;
import com.example.tyresstore.repository.TyreRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TyreService {
    @Autowired
    private TyreRepository tyreRepository;

    // posting new tyre with business logic
    public void addTyre(Tyre tyre) {
        List<Tyre> tyreList = tyreRepository.findAll();

        for (Tyre tyre1 : tyreList) {
            if (Objects.equals(tyre1.getDiameter(), tyre.getDiameter())
            && Objects.equals(tyre1.getHeight(), tyre.getHeight())
            && Objects.equals(tyre1.getImgSrc(), tyre.getImgSrc())
            && Objects.equals(tyre1.getWidth(), tyre.getWidth())
            && tyre1.getSeason() == tyre.getSeason()) {
                throw new IllegalStateException("Tyre already exists");
            }
        }

        tyreRepository.save(tyre);
    }

    // Get tyre by id
    public Optional<Tyre> getTyreById(Long id) {
        if (tyreRepository.existsById(id)) {
            return tyreRepository.findById(id);
        }
        else {
            throw new IllegalStateException("Tyre not found");
        }
    }

    // Getting all tyres
    public List<Tyre> getTyres() {
        return tyreRepository.findAll();
    }

    // Updating Tyre
    @Transactional
    public void updateTyre(long id, Tyre tyre) {
        Tyre searchedTyre = tyreRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Tyre not found"));

        if (tyre.getImgSrc() != null) {
            searchedTyre.setImgSrc(tyre.getImgSrc());
        }
        if (tyre.getHeight() != null) {
            searchedTyre.setHeight(tyre.getHeight());
        }
        if (tyre.getWidth() != null) {
            searchedTyre.setWidth(tyre.getWidth());
        }
        if (tyre.getDiameter() != null) {
            searchedTyre.setDiameter(tyre.getDiameter());
        }
        if (tyre.getSeason() != null &&
                (tyre.getSeason() == Season.WINTER || tyre.getSeason() == Season.SUMMER || tyre.getSeason() == Season.ALLYEAR)) {
            searchedTyre.setSeason(tyre.getSeason());
        }

        tyreRepository.save(searchedTyre);
    }

    // Delete tyre
    public void deleteTyre(Long id) {
        if (tyreRepository.existsById(id)) {
            tyreRepository.deleteById(id);
        }
        else {
            throw new IllegalStateException("Tyre not found");
        }
    }
}
