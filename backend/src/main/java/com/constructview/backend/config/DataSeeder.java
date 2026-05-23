package com.constructview.backend.config;

import com.constructview.backend.model.Obra;
import com.constructview.backend.repository.ObraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ObraRepository obraRepository;

    @Override
    public void run(String... args) throws Exception {
        if (obraRepository.count() == 0) {
            Obra obra1 = new Obra();
            obra1.setNome("Residencial Aurora");
            obra1.setLat(-23.53);
            obra1.setLng(-46.79);
            obra1.setProgresso(68);
            obra1.setConstrutora("Construtora Alfa");
            obra1.setStatus("Em Andamento");
            obra1.setRisco("No prazo");
            obra1.setRoi(22);
            obra1.setFotos(List.of("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"));
            obra1.setEvolucao("[{\"mes\":\"Jan\",\"progresso\":10},{\"mes\":\"Abr\",\"progresso\":68}]");

            Obra obra2 = new Obra();
            obra2.setNome("Parque das Nações");
            obra2.setLat(-23.525);
            obra2.setLng(-46.77);
            obra2.setProgresso(34);
            obra2.setConstrutora("Beta Engenharia");
            obra2.setStatus("Em Andamento");
            obra2.setRisco("Atrasada");
            obra2.setRoi(8);
            obra2.setFotos(List.of("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"));
            obra2.setEvolucao("[{\"mes\":\"Jan\",\"progresso\":5},{\"mes\":\"Abr\",\"progresso\":34}]");

            Obra obra3 = new Obra();
            obra3.setNome("Edifício Central");
            obra3.setLat(-23.54);
            obra3.setLng(-46.80);
            obra3.setProgresso(100);
            obra3.setConstrutora("Construtora Alfa");
            obra3.setStatus("Concluída");
            obra3.setRisco("No prazo");
            obra3.setRoi(18);
            obra3.setFotos(List.of("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"));
            obra3.setEvolucao("[{\"mes\":\"Jan\",\"progresso\":40},{\"mes\":\"Abr\",\"progresso\":100}]");

            obraRepository.saveAll(List.of(obra1, obra2, obra3));
        }
    }
}
